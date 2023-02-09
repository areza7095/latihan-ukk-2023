<h1 align="center">Backend Documentation<img src="https://user-images.githubusercontent.com/1303154/88677602-1635ba80-d120-11ea-84d8-d263ba5fc3c0.gif" width="40px" alt=""><br></h1>

<h3 align="center">Masyarakat</h3>

## Authentication
- POST /api/masyarakat/register
- POST /api/masyarakat/login

## Pengaduan
- POST /api/masyarakat/pengaduan
- GET /api/masyarakat/pengaduanallbynik
- GET /api/masyarakat/pengaduanabyid


<h3 align="center">Petugas</h3>

## Authentication
- POST /api/petugas/register
- POST /api/petugas/login

## Pengaduan
- GET /api/petugas/allpengaduan
- GET /api/petugas/pengaduanbyid

## Tanggapan
- POST /api/petugas/sendTanggapan
- PUT /api/petugas/updateTanggapan

