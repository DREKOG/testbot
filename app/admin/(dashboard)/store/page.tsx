"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import type { StorePackage } from "@/lib/types";

const EMPTY_FORM = {
  name: "",
  price: "",
  currency: "IDR",
  benefitsText: "",
  imageUrl: "",
  highlighted: false,
};

export default function AdminStorePage() {
  const [packages, setPackages] = useState<StorePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function loadPackages() {
    const res = await fetch("/api/store");
    setPackages(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadPackages();
  }, []);

  function startEdit(pkg: StorePackage) {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      price: pkg.price,
      currency: pkg.currency,
      benefitsText: pkg.benefits.join("\n"),
      imageUrl: pkg.imageUrl,
      highlighted: pkg.highlighted,
    });
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
      const url = editingId ? `/api/store/${editingId}` : "/api/store";
      const method = editingId ? "PUT" : "POST";
      const payload = {
        name: form.name,
        price: form.price,
        currency: form.currency,
        imageUrl: form.imageUrl,
        highlighted: form.highlighted,
        benefits: form.benefitsText
          .split("\n")
          .map((b) => b.trim())
          .filter(Boolean),
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: editingId ? "Paket diperbarui." : "Paket baru ditambahkan." });
      cancelEdit();
      loadPackages();
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus paket ini?")) return;
    const res = await fetch(`/api/store/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } else {
      setNotice({ type: "error", message: "Gagal menghapus paket." });
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Kelola Store"
        description="Atur paket rank/donasi beserta harga dan benefit yang tampil di halaman Store."
      />

      <form onSubmit={handleSubmit} className="card mb-8 flex flex-col gap-4 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit Paket" : "Tambah Paket Baru"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="label-field">Nama Paket</label>
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="label-field">Mata Uang</label>
            <input
              className="input-field"
              value={form.currency}
              onChange={(e) => setForm((p) => ({ ...p, currency: e.target.value }))}
              placeholder="IDR"
            />
          </div>
        </div>

        <div>
          <label className="label-field">Harga (angka saja, tanpa simbol mata uang)</label>
          <input
            className="input-field"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            placeholder="60.000"
            required
          />
        </div>

        <div>
          <label className="label-field">Benefit (satu baris = satu benefit)</label>
          <textarea
            className="input-field min-h-[110px] resize-y"
            value={form.benefitsText}
            onChange={(e) => setForm((p) => ({ ...p, benefitsText: e.target.value }))}
            placeholder={"Prefix [VIP]\n6 Home\nKit harian"}
          />
        </div>

        <div>
          <label className="label-field">URL Gambar (opsional)</label>
          <input
            className="input-field"
            value={form.imageUrl}
            onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
            placeholder="https://…"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={form.highlighted}
            onChange={(e) => setForm((p) => ({ ...p, highlighted: e.target.checked }))}
            className="h-4 w-4 rounded border-base-600 bg-base-900 accent-emerald-500"
          />
          Tandai sebagai paket "Terpopuler"
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Menyimpan…" : editingId ? "Simpan Perubahan" : "Tambah Paket"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-ghost">
              Batal
            </button>
          )}
        </div>
      </form>

      <h2 className="mb-4 text-sm font-semibold text-white">Daftar Paket ({packages.length})</h2>
      {loading ? (
        <p className="text-sm text-zinc-500">Memuat…</p>
      ) : packages.length === 0 ? (
        <p className="text-sm text-zinc-500">Belum ada paket.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{pkg.name}</p>
                    {pkg.highlighted && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
                        Populer
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {pkg.currency} {pkg.price} · {pkg.benefits.length} benefit
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => startEdit(pkg)} className="btn-ghost !px-3 !py-1.5 text-xs">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
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
