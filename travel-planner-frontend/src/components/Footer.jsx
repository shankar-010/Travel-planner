function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-500">
        
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">TravelSync</span>.  
          All journeys begin with a plan.
        </p>

        <div className="flex gap-4">
          <span className="hover:text-slate-700 cursor-pointer">Privacy</span>
          <span className="hover:text-slate-700 cursor-pointer">Terms</span>
          <span className="hover:text-slate-700 cursor-pointer">Support</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
