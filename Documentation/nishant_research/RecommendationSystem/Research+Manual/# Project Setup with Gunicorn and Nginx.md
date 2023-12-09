# Project Setup with Gunicorn and Nginx

In this document, we'll outline the steps taken to set up a Flask web application with Gunicorn as the application server and Nginx as the reverse proxy server.

## Prerequisites

- A server running a Unix-like operating system (Ubuntu).
- A domain name pointed to the server's IP address (renting-made-easy.com).
- SSL certificates for your domain (obtained through Let's Encrypt).

## Steps

### 1. Flask App and Gunicorn Setup

1.1. Create a Flask application (e.g., `app.py`) for the project.

1.2. Install Gunicorn using pip:

```bash
   pip install gunicorn
```

1.3 Start Gunicorn to run the Flask app:

```bash

gunicorn --bind 0.0.0.0:5000 app:app

```


### 2. Nginx Installation and Configuration

2.1 Install Nginx:

```bash

sudo apt-get install nginx


```

2.2. Create an Nginx server block configuration file for the domain (/etc/nginx/sites-available/renting-made-easy).


```bash

server {
    listen 443 ssl;
    server_name renting-made-easy.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/renting-made-easy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/renting-made-easy.com/privkey.pem;

    # Proxy settings for forwarding to Gunicorn
    location / {
        proxy_pass http://localhost:5000;  # Assuming Flask runs on port 5000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Optional: Configure logging
    access_log /var/log/nginx/renting-made-easy.com_access.log;
    error_log /var/log/nginx/renting-made-easy.com_error.log;
}


```
2.3. Create a symbolic link to enable the server block configuration:

```bash

sudo ln -s /etc/nginx/sites-available/renting-made-easy /etc/nginx/sites-enabled/

```

2.4. Test the Nginx configuration:

```bash

sudo nginx -t

```

2.5. If the test is successful, reload Nginx to apply the changes:

```bash

sudo systemctl reload nginx

```

### 3. Domain and DNS Setup

3.1. Ensure that the domain name (e.g., renting-made-easy.com) points to the server's IP address in the DNS settings.

3.2. Verify that the SSL certificates are properly configured and up to date.


### 4. Running Gunicorn with nohup (Optional)

4.1. If you want Gunicorn to run indefinitely even after you log out or close the terminal, use the following command:

```bash

nohup gunicorn --bind 0.0.0.0:5000 app:app &

```

This setup should allow the Flask application to be served securely through Nginx, and Gunicorn will handle the application server functionality.