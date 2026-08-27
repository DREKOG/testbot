"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import type { NewsPost } from "@/lib/types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

const EMPTY_FORM = { title: "", content: "", date: today() };

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadNews() {
    const res = await fetch("/api/news");
    setNews(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, []);

  function startEdit(post: NewsPost) {
    setEditingId(post.id);
    setForm({ title: post.title, content: post.content, date: post.date });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const url = editingId ? `/api/news/${editingId}` : "/api/news";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: editingId ? "Pengumuman diperbarui." : "Pengumuman baru ditambahkan." });
      cancelEdit();
      loadNews();
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pengumuman ini?")) return;
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNews((prev) => prev.filter((n) => n.id !== id));
    } else {
      setNotice({ type: "error", message: "Gagal menghapus pengumuman." });
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola News"
        description="Buat, edit, atau hapus pengumuman/update yang tampil di halaman News."
      />

      <form onSubmit={handleSubmit} className="card mb-8 flex flex-col gap-4 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="label-field">Judul</label>
            <input
              className="input-field"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="label-field">Tanggal</label>
            <input
              type="date"
              className="input-field"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="label-field">Isi Pengumuman</label>
          <textarea
            className="input-field min-h-[120px] resize-y"
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            required
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Menyimpan…" : editingId ? "Simpan Perubahan" : "Tambah Pengumuman"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-ghost">
              Batal
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-white">Daftar Pengumuman ({news.length})</h2>
      {loading ? (
        <p className="text-sm text-zinc-500">Memuat…</p>
      ) : news.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada pengumuman.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {news.map((post) => (
            <div key={post.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-emerald-400">{post.date}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{post.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{post.content}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => startEdit(post)} className="btn-ghost !px-3 !py-1.5 text-xs">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
