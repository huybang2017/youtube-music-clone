<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
	<div class="text-center">
		<h1 class="mb-4 text-6xl font-extrabold text-black">404</h1>
		<h2 class="mb-2 text-2xl font-semibold text-neutral-800 md:text-3xl">Không tìm thấy trang</h2>
		<p class="mb-6 text-neutral-600">Trang bạn đang tìm không tồn tại hoặc đã bị xóa.</p>

		<Button color="dark" onclick={() => goto('/')}>Quay về trang chủ</Button>
	</div>
</div>
