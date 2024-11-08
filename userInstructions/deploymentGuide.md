# Deployment Guide

## Prerequisites

### Required Tools
1. **Docker**
   - Install Docker Engine
   - Install Docker Compose
   - Configure Docker registry access

2. **Kubernetes**
   - Install kubectl
   - Configure cluster access
   - Set up namespace

3. **Cloud Provider CLI**
   - AWS CLI
   - Azure CLI
   - Google Cloud SDK

## Environment Setup

### Production Environment Variables
```env
# Application
NODE_ENV=production
PORT=3000
API_URL=https://api.example.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Authentication
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRY=24h

# Redis Cache
REDIS_URL=redis://redis-host:6379

# Email Service
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Monitoring
NEW_RELIC_LICENSE_KEY=your-license-key
SENTRY_DSN=your-sentry-dsn
```

## Docker Deployment

### 1. Build Docker Images
```bash
# Build frontend image
docker build -t hr-finance-frontend:latest -f frontend/Dockerfile .

# Build backend services
docker build -t hr-finance-auth:latest -f services/auth-service/Dockerfile .
docker build -t hr-finance-employee:latest -f services/employee-service/Dockerfile .
docker build -t hr-finance-payroll:latest -f services/payroll-service/Dockerfile .
```

### 2. Docker Compose Deployment
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    image: hr-finance-frontend:latest
    ports:
      - "80:80"
    environment:
      - API_URL=http://api-gateway:3000

  api-gateway:
    image: hr-finance-gateway:latest
    ports:
      - "3000:3000"
    depends_on:
      - auth-service
      - employee-service
      - payroll-service

  auth-service:
    image: hr-finance-auth:latest
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}

  employee-service:
    image: hr-finance-employee:latest
    environment:
      - DATABASE_URL=${DATABASE_URL}

  payroll-service:
    image: hr-finance-payroll:latest
    environment:
      - DATABASE_URL=${DATABASE_URL}

  postgres:
    image: postgres:14
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## Kubernetes Deployment

### 1. Namespace Setup
```bash
kubectl create namespace hr-finance
kubectl config set-context --current --namespace=hr-finance
```

### 2. Secrets Management
```yaml
# secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: hr-finance-secrets
type: Opaque
data:
  DATABASE_URL: base64-encoded-url
  JWT_SECRET: base64-encoded-secret
  SMTP_PASSWORD: base64-encoded-password
```

### 3. Service Deployment
```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: hr-finance-frontend:latest
        ports:
        - containerPort: 80
        envFrom:
        - secretRef:
            name: hr-finance-secrets
```

### 4. Service Exposure
```yaml
# frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: frontend
```

## CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build Images
        run: |
          docker build -t hr-finance-frontend:${{ github.sha }} frontend/
          docker build -t hr-finance-auth:${{ github.sha }} services/auth-service/

      - name: Push Images
        run: |
          docker push hr-finance-frontend:${{ github.sha }}
          docker push hr-finance-auth:${{ github.sha }}

      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/frontend frontend=hr-finance-frontend:${{ github.sha }}
          kubectl set image deployment/auth-service auth=hr-finance-auth:${{ github.sha }}
```

## Monitoring Setup

### 1. Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'hr-finance'
    static_configs:
      - targets: ['localhost:3000']
```

### 2. Grafana Dashboard
- Import provided dashboard templates
- Configure data sources
- Set up alerts

## SSL/TLS Configuration

### 1. Certificate Management
```bash
# Generate SSL certificate using Let's Encrypt
certbot certonly --nginx -d yourdomain.com

# Install certificate
kubectl create secret tls hr-finance-tls \
  --key /etc/letsencrypt/live/yourdomain.com/privkey.pem \
  --cert /etc/letsencrypt/live/yourdomain.com/fullchain.pem
```

### 2. Nginx Configuration
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Backup Procedures

### 1. Database Backup
```bash
# Automated backup script
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/backups

# Backup database
pg_dump -U $DB_USER -d $DB_NAME -F c > $BACKUP_DIR/db_backup_$TIMESTAMP.dump

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/db_backup_$TIMESTAMP.dump s3://your-bucket/backups/
```

### 2. Application State
- Document volumes backup
- Configuration backup
- Secrets backup

## Rollback Procedures

### 1. Version Rollback
```bash
# Rollback deployment
kubectl rollout undo deployment/frontend
kubectl rollout undo deployment/auth-service

# Verify rollback
kubectl rollout status deployment/frontend
kubectl rollout status deployment/auth-service
```

### 2. Database Rollback
```bash
# Restore database from backup
pg_restore -U $DB_USER -d $DB_NAME -F c backup_file.dump
```

## Troubleshooting

### Common Issues

1. **Database Connection**
   - Check connection strings
   - Verify network policies
   - Check service discovery

2. **Application Errors**
   - Check application logs
   - Monitor error rates
   - Review system metrics

3. **Performance Issues**
   - Scale resources
   - Check resource utilization
   - Monitor response times

## Security Checklist

- [ ] SSL/TLS certificates installed
- [ ] Secrets properly managed
- [ ] Network policies configured
- [ ] Access controls implemented
- [ ] Monitoring enabled
- [ ] Backup system verified
- [ ] Security scanning enabled
