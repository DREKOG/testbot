"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import Icon from "@/components/Icon";
import type { Feature } from "@/lib/types";

const ICON_OPTIONS = [
  "pickaxe", "coins", "swords", "shield", "sparkles", "users",
  "server", "compass", "gift", "star", "crown",
];

const EMPTY_FORM = { title: "", description: "", icon: "sparkles" };

export default function AdminFeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadFeatures() {
    const res = await fetch("/api/features");
    const data = await res.json();
    setFeatures(data);
    setLoading(false);
  }

  useEffect(() => {
    loadFeatures();
  }, []);

  function startEdit(feature: Feature) {
    setEditingId(feature.id);
    setForm({ title: feature.title, description: feature.description, icon: feature.icon });
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
      const url = editingId ? `/api/features/${editingId}` : "/api/features";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: editingId ? "Fitur berhasil diperbarui." : "Fitur baru ditambahkan." });
      cancelEdit();
      loadFeatures();
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus fitur ini? Tindakan tidak bisa dibatalkan.")) return;
    const res = await fetch(`/api/features/${id}`, { method: "DELETE" });
    if (res.ok) {
      setFeatures((prev) => prev.filter((f) => f.id !== id));
    } else {
      setNotice({ type: "error", message: "Gagal menghapus fitur." });
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Features"
        description="Tambah, edit, atau hapus fitur/mode permainan yang tampil di halaman Features & Home."
      />

      <form onSubmit={handleSubmit} className="card mb-8 flex flex-col gap-4 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit Fitur" : "Tambah Fitur Baru"}
        </h2>

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
          <label className="label-field">Deskripsi</label>
          <textarea
            className="input-field min-h-[80px] resize-y"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="label-field">Ikon</label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map((icon) => (
              <button
                type="button"
                key={icon}
                onClick={() => setForm((p) => ({ ...p, icon }))}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                  form.icon === icon
                    ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-300"
                    : "border-base-600 text-zinc-500 hover:border-base-500"
                }`}
                aria-label={icon}
              >
                <Icon name={icon} className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Menyimpan…" : editingId ? "Simpan Perubahan" : "Tambah Fitur"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-ghost">
              Batal
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-white">Daftar Fitur ({features.length})</h2>
      {loading ? (
        <p className="text-sm text-zinc-500">Memuat…</p>
      ) : features.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada fitur.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {features.map((feature) => (
            <div key={feature.id} className="card flex items-start gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Icon name={feature.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500">{feature.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(feature)} className="btn-ghost !px-3 !py-1.5 text-xs">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature.id)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
