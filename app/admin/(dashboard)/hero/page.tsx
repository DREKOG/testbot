"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import type { HeroSettings } from "@/lib/types";

const EMPTY: HeroSettings = { headline: "", subheadline: "", backgroundImageUrl: "" };

export default function AdminHeroPage() {
  const [form, setForm] = useState<HeroSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch(() => setNotice({ type: "error", message: "Gagal memuat data." }))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof HeroSettings>(key: K, value: HeroSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: "Hero section berhasil diperbarui." });
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-zinc-500">Memuat…</p>;

  return (
    <div>
      <AdminPageHeader
        title="Hero Section"
        description="Headline utama yang pertama kali dilihat pengunjung di halaman Home."
      />

      <form onSubmit={handleSubmit} className="card flex flex-col gap-5 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}

        <div>
          <label className="label-field">Headline</label>
          <input
            className="input-field"
            value={form.headline}
            onChange={(e) => update("headline", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label-field">Subheadline</label>
          <textarea
            className="input-field min-h-[90px] resize-y"
            value={form.subheadline}
            onChange={(e) => update("subheadline", e.target.value)}
          />
        </div>

        <div>
          <label className="label-field">URL Gambar Background (opsional)</label>
          <input
            className="input-field"
            value={form.backgroundImageUrl}
            onChange={(e) => update("backgroundImageUrl", e.target.value)}
            placeholder="https://…"
          />
          <p className="mt-1.5 text-xs text-zinc-600">
            Kosongkan jika ingin memakai background grid polos tanpa gambar.
          </p>
        </div>

        <button type="submit" disabled={saving} className="btn-primary mt-2 w-full sm:w-auto disabled:opacity-60">
          {saving ? "Menyimpan…" : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
