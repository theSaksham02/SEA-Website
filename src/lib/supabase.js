import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Form submission helpers
export const submitEventRegistration = async (data) => {
    const { error } = await supabase
        .from('event_registrations')
        .insert([{
            name: data.name,
            email: data.email,
            student_id: data.studentId,
            event_name: data.eventName
        }]);
    if (error) throw error;
    return { success: true };
};

export const submitStartupTeamApplication = async (data) => {
    const { error } = await supabase
        .from('startup_team_applications')
        .insert([{
            name: data.name,
            email: data.email,
            skills: data.skills,
            linkedin: data.linkedin
        }]);
    if (error) throw error;
    return { success: true };
};

export const submitStartupApplication = async (data) => {
    const { error } = await supabase
        .from('startup_applications')
        .insert([{
            founder_name: data.name,
            email: data.email,
            startup_name: data.startupName,
            stage: data.stage,
            description: data.description
        }]);
    if (error) throw error;
    return { success: true };
};

export const submitSponsorInquiry = async (data) => {
    const { error } = await supabase
        .from('sponsor_inquiries')
        .insert([{
            company: data.company,
            contact_name: data.name,
            email: data.email,
            partnership_type: data.type
        }]);
    if (error) throw error;
    return { success: true };
};

export const submitNewsletterSubscription = async (email) => {
    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
    if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
            return { success: true, message: 'Already subscribed!' };
        }
        throw error;
    }
    return { success: true };
};
