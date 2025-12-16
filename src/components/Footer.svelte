<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-white/10 bg-slate-950">
  <div
    class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400"
  >
    <p>
      &copy; {year} Vangelis Manouhos. All rights reserved.
    </p>

    <div class="flex gap-4">
      <a href="/" class="hover:text-sky-400 transition">Home</a>
      <a href="/about" class="hover:text-sky-400 transition">About</a>
      <a href="/projects" class="hover:text-sky-400 transition">Projects</a>
      <a href="/contact" class="hover:text-sky-400 transition">Contact</a>
    </div>
  </div>
</footer>
