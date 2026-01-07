import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getData } from '@/lib/api';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_auth');

    if (!token) {
        redirect('/admin/login');
    }

    const data = await getData();

    return <AdminDashboard initialData={data} />;
}
