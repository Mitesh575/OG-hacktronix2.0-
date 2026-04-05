import { motion } from "framer-motion";
import { MapPin, Phone, Mail, PhoneCall } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const contactInfo = [
  {
    label: "Address",
    value: "KIET Group of Institutions, Ghaziabad, UP",
    icon: MapPin,
    gradient: "from-red-500 to-orange-400",
  },
  {
    label: "Phone",
    value: "+91 98765 43210",
    icon: Phone,
    gradient: "from-green-500 to-emerald-400",
  },
  {
    label: "Email",
    value: "hacktronix@kiet.edu",
    icon: Mail,
    gradient: "from-blue-500 to-cyan-400",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4">
            <PhoneCall className="w-4 h-4" />
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-4">
            Get in <span className="heading-gradient">Touch</span>
          </h2>
          <p className="muted max-w-xl mx-auto text-lg">
            Have questions? We&apos;d love to hear from you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <GlassCard className="p-5 md:p-6 flex items-center gap-4 rounded-sm" interactive>
                  <div
                    className="w-12 h-12 rounded-sm bg-gradient-to-r flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:shadow-[0_0_16px_rgba(0,245,255,0.15)] transition-shadow duration-300"
                    style={{ background: `linear-gradient(135deg, ${info.gradient.replace("from-", "")})` }}
                  >
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="sw-label mb-0.5">{info.label}</p>
                    <p className="text-white font-medium text-base font-mono">{info.value}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <GlassCard className="overflow-hidden h-full min-h-[300px] rounded-sm" interactive>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0!2d77.0!3d28.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDAwJzAwLjAiTiA3N0KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
