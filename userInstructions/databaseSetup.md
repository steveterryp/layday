# Database Setup Guide

## Prerequisites

### Required Software
1. **PostgreSQL 14+**
   ```bash
   # Windows
   Download and install from https://www.postgresql.org/download/windows/

   # macOS
   brew install postgresql@14

   # Linux (Ubuntu)
   sudo apt install postgresql-14
   ```

2. **Database Management Tool (Optional)**
   - pgAdmin 4 (https://www.pgadmin.org/)
   - DBeaver (https://dbeaver.io/)
   - TablePlus (https://tableplus.com/)

## Database Creation

### Local Development

1. **Start PostgreSQL Service**
   ```bash
   # Windows
   net start postgresql-x64-14

   # macOS
   brew services start postgresql@14

   # Linux
   sudo systemctl start postgresql
   ```

2. **Create Database**
   ```sql
   -- Connect to PostgreSQL
   psql -U postgres

   -- Create database
   CREATE DATABASE hr_finance_db;

   -- Create user
   CREATE USER hr_finance_user WITH ENCRYPTED PASSWORD 'your_password';

   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE hr_finance_db TO hr_finance_user;
   ```

3. **Configure Environment Variables**
   ```bash
   # Add to .env file
   DATABASE_URL=postgresql://hr_finance_user:your_password@localhost:5432/hr_finance_db
   ```

## Schema Setup

### Core Tables

1. **Users Table**
   ```sql
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     role VARCHAR(50) NOT NULL,
     department VARCHAR(100),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Employees Table**
   ```sql
   CREATE TABLE employees (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     employee_id VARCHAR(50) UNIQUE NOT NULL,
     user_id UUID REFERENCES users(id),
     position VARCHAR(100) NOT NULL,
     salary DECIMAL(10,2) NOT NULL,
     start_date DATE NOT NULL,
     status VARCHAR(50) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Time Entries Table**
   ```sql
   CREATE TABLE time_entries (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     employee_id UUID REFERENCES employees(id),
     date DATE NOT NULL,
     hours_worked DECIMAL(4,2) NOT NULL,
     overtime_hours DECIMAL(4,2) DEFAULT 0,
     status VARCHAR(50) NOT NULL,
     notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Leave Requests Table**
   ```sql
   CREATE TABLE leave_requests (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     employee_id UUID REFERENCES employees(id),
     type VARCHAR(50) NOT NULL,
     start_date DATE NOT NULL,
     end_date DATE NOT NULL,
     status VARCHAR(50) NOT NULL,
     reason TEXT,
     approved_by UUID REFERENCES users(id),
     approved_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Payroll Table**
   ```sql
   CREATE TABLE payroll (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     employee_id UUID REFERENCES employees(id),
     period_start DATE NOT NULL,
     period_end DATE NOT NULL,
     base_pay DECIMAL(10,2) NOT NULL,
     overtime_pay DECIMAL(10,2) DEFAULT 0,
     deductions DECIMAL(10,2) DEFAULT 0,
     taxes DECIMAL(10,2) DEFAULT 0,
     net_pay DECIMAL(10,2) NOT NULL,
     status VARCHAR(50) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Database Maintenance

### Backup Procedures

1. **Create Backup**
   ```bash
   # Full database backup
   pg_dump -U hr_finance_user -d hr_finance_db -F c -b -v -f backup.sql

   # Schema only
   pg_dump -U hr_finance_user -d hr_finance_db --schema-only -F c -b -v -f schema.sql
   ```

2. **Restore from Backup**
   ```bash
   # Restore full backup
   pg_restore -U hr_finance_user -d hr_finance_db -v backup.sql

   # Restore schema only
   pg_restore -U hr_finance_user -d hr_finance_db -v schema.sql
   ```

### Database Migrations

1. **Install Migration Tool**
   ```bash
   npm install -g db-migrate
   npm install -g db-migrate-pg
   ```

2. **Create Migration**
   ```bash
   db-migrate create add-user-table
   ```

3. **Run Migrations**
   ```bash
   # Run all migrations
   db-migrate up

   # Rollback last migration
   db-migrate down
   ```

## Performance Optimization

### Indexes

1. **Create Indexes**
   ```sql
   -- Users email index
   CREATE INDEX idx_users_email ON users(email);

   -- Employees search index
   CREATE INDEX idx_employees_search ON employees(employee_id, status);

   -- Time entries index
   CREATE INDEX idx_time_entries_employee_date ON time_entries(employee_id, date);

   -- Leave requests index
   CREATE INDEX idx_leave_requests_employee_dates ON leave_requests(employee_id, start_date, end_date);

   -- Payroll index
   CREATE INDEX idx_payroll_employee_period ON payroll(employee_id, period_start, period_end);
   ```

### Maintenance Tasks

1. **Vacuum Database**
   ```sql
   -- Analyze all tables
   VACUUM ANALYZE;

   -- Full vacuum
   VACUUM FULL;
   ```

2. **Update Statistics**
   ```sql
   ANALYZE;
   ```

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Check PostgreSQL service status
   - Verify connection string
   - Check firewall settings
   - Verify user permissions

2. **Performance Issues**
   - Run EXPLAIN ANALYZE on slow queries
   - Check index usage
   - Update table statistics
   - Monitor connection pool

### Monitoring

1. **Active Connections**
   ```sql
   SELECT * FROM pg_stat_activity;
   ```

2. **Table Sizes**
   ```sql
   SELECT 
     relname as table_name,
     pg_size_pretty(pg_total_relation_size(relid)) as total_size
   FROM pg_catalog.pg_statio_user_tables
   ORDER BY pg_total_relation_size(relid) DESC;
   ```

## Security

### Best Practices

1. **User Management**
   - Use role-based access control
   - Regularly rotate passwords
   - Limit superuser access
   - Audit user permissions

2. **Connection Security**
   - Use SSL connections
   - Implement connection pooling
   - Set connection timeouts
   - Monitor failed login attempts

3. **Data Protection**
   - Encrypt sensitive data
   - Regular security audits
   - Backup encryption
   - Access logging
