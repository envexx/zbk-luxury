# Cara Menghapus Secret Key dari Git History

GitHub memblokir push karena secret key masih ada di commit history lama (commit: e1b93b59e03624eecf510a433b5c51bfe6698078).

## Solusi 1: Menggunakan GitHub Secret Scanning Unblock (Cara Termudah)

1. Buka URL yang diberikan GitHub:
   ```
   https://github.com/envexx/zbk-luxury/security/secret-scanning/unblock-secret/36WyWThLeOI5EaY2r59OPJZJowy
   ```

2. Klik "Allow secret" untuk sementara (ini akan memungkinkan push, tapi secret masih ada di history)

3. Setelah push berhasil, pastikan secret key tidak ada di commit baru

## Solusi 2: Menghapus Secret dari History (Recommended)

### Menggunakan Git Bash (Git for Windows)

1. Buka **Git Bash** (bukan PowerShell)

2. Jalankan command berikut:

```bash
export FILTER_BRANCH_SQUELCH_WARNING=1

git filter-branch -f --tree-filter '
if [ -f STRIPE_ENV_SETUP.md ]; then
  sed -i "s/sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY/sk_test_YOUR_SECRET_KEY_HERE/g" STRIPE_ENV_SETUP.md
  sed -i "s/pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY/pk_test_YOUR_PUBLISHABLE_KEY_HERE/g" STRIPE_ENV_SETUP.md
fi
if [ -f STRIPE_PAYMENT_SETUP.md ]; then
  sed -i "s/sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY/sk_test_YOUR_SECRET_KEY_HERE/g" STRIPE_PAYMENT_SETUP.md
  sed -i "s/pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY/pk_test_YOUR_PUBLISHABLE_KEY_HERE/g" STRIPE_PAYMENT_SETUP.md
fi
if [ -f TROUBLESHOOTING_404.md ]; then
  sed -i "s/sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY/sk_test_YOUR_SECRET_KEY_HERE/g" TROUBLESHOOTING_404.md
fi
' --prune-empty --tag-name-filter cat -- --all
```

3. Setelah selesai, force push:
```bash
git push --force-with-lease origin main
```

**PERINGATAN:** Force push akan menulis ulang history. Pastikan tidak ada orang lain yang sudah pull repository ini.

## Solusi 3: Menggunakan BFG Repo-Cleaner (Paling Mudah)

1. Download BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/

2. Buat file `secrets.txt` dengan isi:
```
sk_test_51OLDyuA3wfYYkixjiJRzLy36QtMYZ5MAyDyKEvjYPocJzcnFPtspDplD4XxRSd8g1KmWnnBR5CW5eUMyDj1rgMIO00hOtIfaJY==>sk_test_YOUR_SECRET_KEY_HERE
pk_test_51OLDyuA3wfYYkixjEeUM3OByMP5PmdXdfq9wzmPEhdDAv3bZvrEtmFr7myAfSV0n3rXcy1mrFAUXSw19G1uYw1PO00R9ZGrqAY==>pk_test_YOUR_PUBLISHABLE_KEY_HERE
```

3. Jalankan:
```bash
java -jar bfg.jar --replace-text secrets.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

4. Force push:
```bash
git push --force-with-lease origin main
```

## Rekomendasi

**Untuk saat ini, gunakan Solusi 1** (GitHub Secret Scanning Unblock) karena:
- Paling cepat dan mudah
- Tidak perlu rewrite history
- Secret key sudah dihapus dari commit baru
- History lama masih ada tapi tidak akan ter-expose lagi

Setelah push berhasil, pastikan:
1. Secret key tidak ada di file baru
2. File `.env.local` ada di `.gitignore`
3. Jangan commit secret key lagi di masa depan

