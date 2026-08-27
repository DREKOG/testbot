"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import type { Rule } from "@/lib/types";

export default function AdminRulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadRules() {
    const res = await fetch("/api/rules");
    setRules(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadRules();
  }, []);

  function startEdit(rule: Rule) {
    setEditingId(rule.id);
    setText(rule.text);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setText("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const url = editingId ? `/api/rules/${editingId}` : "/api/rules";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: editingId ? "Peraturan diperbarui." : "Peraturan baru ditambahkan." });
      cancelEdit();
      loadRules();
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus peraturan ini?")) return;
    const res = await fetch(`/api/rules/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRules((prev) => prev.filter((r) => r.id !== id));
    } else {
      setNotice({ type: "error", message: "Gagal menghapus peraturan." });
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Rules"
        description="Tambah, edit, atau hapus peraturan server yang tampil di halaman Rules."
      />

      <form onSubmit={handleSubmit} className="card mb-8 flex flex-col gap-4 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit Peraturan" : "Tambah Peraturan Baru"}
        </h2>
        <div>
          <label className="label-field">Isi Peraturan</label>
          <textarea
            className="input-field min-h-[80px] resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Menyimpan…" : editingId ? "Simpan Perubahan" : "Tambah Peraturan"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-ghost">
              Batal
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-white">Daftar Peraturan ({rules.length})</h2>
      {loading ? (
        <p className="text-sm text-zinc-500">Memuat…</p>
      ) : rules.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada peraturan.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rules.map((rule, i) => (
            <div key={rule.id} className="card flex items-start gap-4 p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="flex-1 pt-0.5 text-sm text-zinc-300">{rule.text}</p>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => startEdit(rule)} className="btn-ghost !px-3 !py-1.5 text-xs">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rule.id)}
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
