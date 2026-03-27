# European Auto Service - Booking Website

A professional website for European car specialists to accept bookings and manage availability.

## What This Website Does

- **Home Page**: Hero section, services list, booking form, contact info
- **Admin Page**: Toggle availability, manage bookings, stats dashboard

## Supported Car Brands

| German | Italian | British | Swedish |
|--------|---------|---------|---------|
| BMW | Ferrari | Jaguar | Volvo |
| Mercedes-Benz | Lamborghini | Land Rover | |
| Audi | Maserati | Bentley | |
| Volkswagen | Alfa Romeo | Mini | |
| Porsche | | | |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | Web framework |
| Tailwind CSS | Styling |
| Supabase | Database (free) |
| Vercel | Hosting (free) |

## Project Structure

```
bmw-mechanic/
├── app/
│   ├── page.tsx          # Main page (home)
│   ├── admin/page.tsx    # Admin dashboard
│   ├── layout.tsx        # Page layout wrapper
│   └── globals.css       # Global styles
├── components/
│   ├── AvailabilityBadge.tsx  # Shows Open/Closed
│   ├── ServiceList.tsx        # Shows services
│   └── BookingForm.tsx        # Booking form
├── config/
│   └── site.ts            # All customizable content
├── lib/
│   └── supabase.ts        # Database connection
└── .env.local             # Your secret keys
```

## How to Customize Business Info

Edit `config/site.ts`:

```typescript
export const SITE_CONFIG = {
  name: "Your Business Name",        // <- Change this
  phone: "(555) 123-4567",           // <- Change this
  email: "your@email.com",           // <- Change this
  address: "123 Your Street",        // <- Change this
  city: "Your City",                 // <- Change this
  hours: "Mon-Fri 8am-6pm",          // <- Change this
  adminPassword: "your-password"     // <- Change this
}
```

## Setup Instructions

### Step 1: Install Dependencies

```bash
cd bmw-mechanic
npm install
```

### Step 2: Create Supabase Account

1. Go to https://supabase.com
2. Sign up (free)
3. Create a new project

### Step 3: Create Database Tables

In Supabase dashboard, go to SQL Editor and run:

```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  car_model TEXT NOT NULL,
  service TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  is_open BOOLEAN DEFAULT false
);

-- Add default settings
INSERT INTO settings (id, is_open) VALUES (1, false);

-- Policies
CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Anyone can update settings" ON settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete bookings" ON bookings FOR DELETE USING (true);
```

### Step 4: Enable Realtime

1. In Supabase dashboard, go to SQL Editor
2. Run this:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE settings;
```

### Step 5: Get API Keys

1. In Supabase dashboard, go to Settings > API
2. Copy "Project URL" and "anon public" key
3. Paste them in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
ADMIN_PASSWORD=your-secure-password
```

### Step 6: Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### Step 7: Deploy to Vercel

1. Push code to GitHub
2. Go to vercel.com
3. Import your GitHub repo
4. Add environment variables
5. Deploy!

## Admin Features

Go to `/admin` and enter your password.

| Feature | Description |
|---------|-------------|
| Toggle Status | Open/Close shop |
| Stats Dashboard | View booking counts |
| Filter Bookings | All/Pending/Accepted/Rejected |
| Accept/Reject | Manage booking requests |
| Delete | Remove individual bookings |
| Clear | Clear completed or today's bookings |

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Check code for errors |

## Need Help?

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
