/*
  # Portfolio Backend Schema

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)
      - `read` (boolean)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `tags` (text[])
      - `link` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `skills`
      - `id` (uuid, primary key)
      - `category` (text)
      - `name` (text)
      - `proficiency` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public can create messages
    - Only authenticated admin can read messages
    - Public can read projects and skills
    - Only authenticated admin can modify projects and skills
*/

-- Messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a message
CREATE POLICY "Anyone can submit a message"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admin can view messages
CREATE POLICY "Only admin can view messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'admin');

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tags text[] DEFAULT '{}',
  link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Only admin can modify projects
CREATE POLICY "Only admin can modify projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  proficiency integer CHECK (proficiency BETWEEN 1 AND 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Anyone can view skills
CREATE POLICY "Anyone can view skills"
  ON skills
  FOR SELECT
  TO public
  USING (true);

-- Only admin can modify skills
CREATE POLICY "Only admin can modify skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');