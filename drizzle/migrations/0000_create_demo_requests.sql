CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  hospital text NOT NULL CHECK (char_length(hospital) BETWEEN 2 AND 150),
  phone text NOT NULL CHECK (phone ~ '^[6-9][0-9]{9}$'),
  email text CHECK (email IS NULL OR char_length(email) <= 255),
  staff_count text CHECK (staff_count IS NULL OR staff_count IN ('1–50', '51–200', '201–500', '500+')),
  role text CHECK (role IS NULL OR role IN ('Owner/Director', 'Administrator', 'Operations', 'Other')),
  message text CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.demo_requests TO anon;
GRANT INSERT ON public.demo_requests TO authenticated;
GRANT ALL ON public.demo_requests TO service_role;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a demo" ON public.demo_requests FOR INSERT TO anon, authenticated WITH CHECK (true);