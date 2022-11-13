import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://deuoeynolpybhxhczosj.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldW9leW5vbHB5Ymh4aGN6b3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNjM2MjYsImV4cCI6MTk4MzkzOTYyNn0.UXL99Z0jAoDf_pDVcrrgA5Tuk14n7knpLVVBVQvWgLY"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {


    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*")
        }
    }
} 