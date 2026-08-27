"use client";

import { useEffect, useState, type FormEvent } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FormNotice from "@/components/admin/FormNotice";
import type { GeneralSettings } from "@/lib/types";

const EMPTY: GeneralSettings = {
  serverName: "",
  serverIp: "",
  serverPort: "25565",
  description: "",
  logoUrl: "",
  discordUrl: "",
  voteUrl: "",
};

export default function AdminGeneralPage() {
  const [form, setForm] = useState<GeneralSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/general")
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch(() => setNotice({ type: "error", message: "Gagal memuat data." }))
      .finally(() => setLoading(false));
  }, []);

  function update<K extends keyof GeneralSettings>(key: K, value: GeneralSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const res = await fetch("/api/general", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setNotice({ type: "success", message: "Pengaturan umum berhasil disimpan." });
    } catch (err) {
      setNotice({ type: "error", message: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">Memuat…</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Pengaturan Umum"
        description="Informasi dasar server yang tampil di berbagai halaman publik."
      />

      <form onSubmit={handleSubmit} className="card flex flex-col gap-5 p-6">
        {notice && <FormNotice type={notice.type} message={notice.message} />}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Nama Server</label>
            <input
              className="input-field"
              value={form.serverName}
              onChange={(e) => update("serverName", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="label-field">IP Server</label>
              <input
                className="input-field font-mono"
                value={form.serverIp}
                onChange={(e) => update("serverIp", e.target.value)}
                placeholder="play.contoh.net"
                required
              />
            </div>
            <div>
              <label className="label-field">Port</label>
              <input
                className="input-field font-mono"
                value={form.serverPort}
                onChange={(e) => update("serverPort", e.target.value)}
                placeholder="25565"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="label-field">Deskripsi</label>
          <textarea
            className="input-field min-h-[100px] resize-y"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div>
          <label className="label-field">URL Logo</label>
          <input
            className="input-field"
            value={form.logoUrl}
            onChange={(e) => update("logoUrl", e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field">Link Discord</label>
            <input
              className="input-field"
              value={form.discordUrl}
              onChange={(e) => update("discordUrl", e.target.value)}
              placeholder="https://discord.gg/…"
            />
          </div>
          <div>
            <label className="label-field">Link Vote</label>
            <input
              className="input-field"
              value={form.voteUrl}
              onChange={(e) => update("voteUrl", e.target.value)}
              placeholder="https://…"
            />
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary mt-2 w-full sm:w-auto disabled:opacity-60">
          {saving ? "Menyimpan…" : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
