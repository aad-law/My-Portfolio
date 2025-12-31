import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getData } from '@/lib/api';
import AdminDashboard from '@/Components/AdminDashboard';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
        redirect('/admin/login');
    }

    const data = await getData();

    return <AdminDashboard initialData={data} />;
}
