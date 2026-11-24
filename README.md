# Pro5

![Pro5 desktop](docs/images/pro5-desktop.png)

## Cấu trúc

```text
Pro5/
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── css/styles.css
│   │   └── js/script.js
│   ├── data/
│   │   ├── images/
│   │   ├── background/
│   │   │   ├── landscape/
│   │   │   └── mobile/
│   │   ├── badges/
│   │   ├── decoration/
│   │   ├── games/
│   │   ├── favicon/
│   │   └── music/
│   ├── styles.css
│   ├── script.js
│   ├── robots.txt
│   └── sitemap.xml
├── tools/
│   ├── serve.sh
│   ├── deploy.sh
│   └── music-sync.py
├── services/
│   ├── lanyard/
│   │   ├── lib/
│   │   ├── config/
│   │   ├── Dockerfile
│   │   ├── compose.yaml
│   │   ├── .env.example
│   │   ├── mix.exs
│   │   └── mix.lock
│   ├── spotify/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── .env.example
│   └── README.md
├── docs/images/pro5-desktop.png
└── README.md
```

## Chạy local

Cài Python 3 và Git:

```bash
git clone --branch lanyard https://github.com/Lemanh1231/Pro5.git
cd Pro5
bash tools/serve.sh
```

Mở `http://127.0.0.1:8080`.

```bash
HOST=0.0.0.0 PORT=8080 bash tools/serve.sh
```

Chỉ dùng `HOST=0.0.0.0` khi cần truy cập từ mạng nội bộ tin cậy.

## Chỉnh sửa

Sửa giao diện tại `public/index.html`, `public/assets/css/styles.css` và
`public/assets/js/script.js`. Giữ các symlink để URL tài nguyên cũ vẫn hoạt động.

## Deploy

Cài Node.js và rsync. Sao lưu document root trước khi cập nhật:

```bash
sudo tar -czf /path/to/pro5-backup.tar.gz -C /var/www kotori.click
sudo bash tools/deploy.sh
```

Hoặc chọn thư mục khác:

```bash
sudo WEB_ROOT=/var/www/profile bash tools/deploy.sh
```

Deploy mặc định tới `/var/www/kotori.click`, không xóa file cũ và không restart dịch vụ.

## Nginx

Thêm server block cho domain của bạn:

```nginx
server {
    listen 80;
    server_name profile.example.com;
    root /var/www/profile;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Cấu hình HTTPS trước khi dùng các tích hợp realtime. Không ghi đè server block
đang phục vụ dịch vụ khác bằng mẫu trên.

## Nhạc

Cài FFmpeg/ffprobe, thêm audio vào `media/music-source/songs/` và ảnh bìa WebP
cùng tên file vào `media/music-source/images/`:

```text
media/music-source/
├── songs/
│   └── Track.m4a
└── images/
    └── Track.webp
```

```bash
python3 tools/music-sync.py
```

Xuất trực tiếp vào web đang chạy:

```bash
MUSIC_PUBLIC=/var/www/kotori.click/data/music python3 tools/music-sync.py
```

Audio và playlist không được cung cấp sẵn trong Git. Chỉ xuất bản nội dung bạn
có quyền sử dụng; không commit nhạc riêng tư.

## Discord và Spotify realtime

Làm theo [services/README.md](services/README.md) để dựng Lanyard, Redis,
Spotify và proxy API/WebSocket. Preview tĩnh không tự cung cấp các endpoint.
Giữ token, client secret và refresh token trong `.env` trên máy chủ;
không đưa chúng vào frontend hoặc Git.

## Cập nhật

```bash
git pull --ff-only origin lanyard
node --check public/assets/js/script.js
sudo bash tools/deploy.sh
```
