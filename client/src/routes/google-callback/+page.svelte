<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const params = new URLSearchParams(window.location.search);

		const accessToken = params.get('accessToken');
		const name = params.get('name');
		const email = params.get('email');
		const avatar = params.get('avatar');
		const provider = params.get('provider');
		const providerId = params.get('providerId');
		const role = params.get('role');

		if (accessToken && email) {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem(
				'user',
				JSON.stringify({ name, email, avatar, provider, providerId, role })
			);

			goto('/');
		} else {
			alert('Đăng nhập thất bại!');
			goto('/login');
		}
	});
</script>

<p>Đang xử lý đăng nhập...</p>
