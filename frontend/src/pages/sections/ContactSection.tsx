export default function ContactSection() {
  return (
    <footer id="contact" className="bg-brand-burgundy text-white py-16 px-6 md:px-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
        <p className="text-white/70 font-sans mb-8">
          Have a question about an order or a custom design request? 
          We'd love to hear from you.
        </p>
        <a href="mailto:hello@ooakstore.com" className="inline-block bg-brand-silver text-brand-burgundy px-8 py-4 rounded-sm font-elegant font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors mb-12">
          Email Us
        </a>
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-sans text-white/50">
          <p>© 2026 OOAK Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}