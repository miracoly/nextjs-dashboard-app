import {redirect as _redirect, RedirectType} from 'next/navigation';
import {revalidatePath as _revalidatePath} from 'next/cache';

type UdpRoutes = '/dashboard/invoices';


export const redirect: (route: UdpRoutes, type?: RedirectType) => ReturnType<typeof _redirect> = _redirect;

export const revalidatePath = (route: UdpRoutes) => _revalidatePath(route);
