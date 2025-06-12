// WANAC Coaching Platform - Home Page
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserTie, FaQuoteLeft } from 'react-icons/fa';
import Script from 'next/script';

export default function Homepage() {
  return (
    <div className="bg-background text-foreground relative overflow-x-hidden">
      <Head>
        <title>WANAC COACHING PLATFORM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script src="https://cdn.lordicon.com/lordicon.js" />

      {/* Hero Section */}
<section className="min-h-[65vh] bg-[#002147] text-white py-24 relative object-cover z-0 overflow-hidden">
  {/* Hero Background Image + Extra Gradients */}
  <div 
    className="absolute inset-0 w-full h-full z-0"
    style={{
      backgroundImage: `linear-gradient(150deg, rgba(0,33,71,0.85) 10%, rgba(255,94,26,0.60) 300%, rgba(255,255,255,0.90) 100%), url('/landingpage4.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'none',
    }}
    aria-hidden="true"
  />
  {/* Animated/blurred gradients for extra pop */}
  <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-gradient-to-br from-orange-400/30 via-orange-500/20 to-blue-400/20 rounded-full blur-3xl animate-pulse z-0" />
  <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-tr from-blue-400/20 via-white/10 to-orange-400/20 rounded-full blur-2xl animate-pulse z-0" />
  <div className="container mx-auto grid grid-cols-10 px-6 relative z-10">
    <div className="col-start-2 col-span-8 flex flex-col">
      <h1 className="text-5xl font-extrabold max-w-3xl leading-tight uppercase tracking-wide text-heading">
      Empowering Veterans to Thrive After Service
        <span className="text-orange-500">AND COMMUNITY SUPPORT.</span>
      </h1>
      <p className="text-lg mt-4 max-w-xl text-white">
      Get tailored coaching, smart tools, and a community that truly understands your journey.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          href="/signup"
          className="border-2 border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-[white] transition-all"
        >
          Get Started for Free
        </Link>
        <Link href="/login" className="border-2 border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-background transition-all">
        How it Works
        </Link>
      </div>
    </div>
  </div>
</section>

<section id="how-we-help" className="py-16 px-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(155deg, #f8fafc 0%, #ffedd5 50%, #e0e7ff 100%)' }}>
  {/* Extra gradients for visual layering */}
  <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 via-orange-200/10 to-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
  <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-blue-400/10 via-white/10 to-orange-400/10 rounded-full blur-2xl z-0" />

  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#002147]/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
  
  {/* Content Container */}
  <div className="relative z-10">
    {/* Section Header */}
    <div className="mb-12">
      <h2 className="text-3xl font-bold mt-2 mb-3 uppercase text-[#002147]">How We Help</h2>
      <div className="w-16 h-1 bg-[#002147] mx-auto rounded-full"/>
    </div>

    {/* Cards Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {[{
        title: 'Promise Land Education Pathway (PLEP)',
        desc: 'Navigate your educational journey with structured academic transition support.',
        icon: '',
        image: '/promiselandtransition.jpg',
        alt: 'Education Pathway Program',
        highlights: ['Academic Support', 'Mentoring']
      }, {
        title: 'Promise Land Career Accelerator (PLCA)',
        desc: 'Accelerate your professional success with comprehensive career management.',
        icon: '',
        image: '/transitioncoaching11.jpg',
        alt: 'Career Accelerator Program',
        highlights: ['Career Growth', 'Strategy']
      }, {
        title: 'Peak Performance Coaching (PPC)',
        desc: 'Master excellence through our structured 12-session coaching model.',
        icon: '',
        image: '/transitionguide.jpg',
        alt: 'Peak Performance Coaching',
        highlights: ['12-Sessions', 'Development']
      }, {
        title: 'Vetrepreneurship Academy (VETA)',
        desc: 'Build your entrepreneurial legacy with business planning and mentorship.',
        icon: '',
        image: '/Performancecoaching.png',
        alt: 'Vetrepreneurship Academy',
        highlights: ['Business', 'Mentorship']
      }].map(({ title, desc, icon, image, alt, highlights }) => (
        <div 
          key={title} 
          className="group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image Container */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/50 to-transparent"/>
          </div>

          {/* Content Container */}
          <div className="p-6">
            {/* Icon */}
            <div className="w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center text-xl mx-auto -mt-12 relative z-10 border-3 border-white group-hover:scale-110 transition-transform">
              {icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold mt-3 mb-2 text-[#002147]">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{desc}</p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-2">
              {highlights.map((item) => (
                <span 
                  key={item} 
                  className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-20 px-6 bg-[#002147] text-white relative overflow-hidden">
        {/* Extra gradients for features section */}
        <div className="absolute -top-24 left-1/2 w-[36rem] h-[36rem] bg-gradient-to-br from-orange-400/20 via-blue-400/10 to-white/10 rounded-full blur-3xl -translate-x-1/2 z-0 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 via-white/10 to-orange-400/10 rounded-full blur-2xl z-0" />
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src="/aIandfeatires.jpg"
      alt="Background"
      className="w-full h-full object-cover opacity-20"
    />
    {/* Optional overlay for better contrast */}
    <div className="absolute inset-0 bg-[#002147] opacity-80"></div>
  </div>
  <div className="max-w-7xl mx-auto text-center relative z-10">
    {/* Section Title */}
    <h2 className="text-3xl font-semibold mb-8">KEY WEB APP FEATURES</h2>
    <p className="text-lg mb-12">Discover the powerful features that make our web app the best choice for your needs.</p>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
      {/* Feature 1 */}
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10">
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-lg blur"></div>
          <lord-icon
            src="https://cdn.lordicon.com/uoljexdg.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '80px', height: '80px' }}
            class="mx-auto relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center text-white">Session Booking</h3>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Easily book your sessions with a simple, intuitive interface that guarantees a smooth user experience.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10">
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-lg blur"></div>
          <lord-icon
            src="https://cdn.lordicon.com/qvbrkejx.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '80px', height: '80px' }}
            class="mx-auto relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center text-white">AI Assistant</h3>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Get personalized assistance with our AI-driven assistant, designed to streamline your tasks and improve productivity.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10">
        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-lg blur"></div>
          <lord-icon
            src="https://cdn.lordicon.com/nayeills.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '80px', height: '80px' }}
            class="mx-auto relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center text-white">Real-Time Updates</h3>
        <p className="text-lg text-gray-300 text-center leading-relaxed">
          Stay informed with real-time notifications and updates, ensuring you're always in the loop.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Community and Testimonial */}
      <section className="py-20 px-6 bg-white text-[#002147] relative overflow-hidden" style={{ background: 'linear-gradient(155deg, #f8fafc 0%, #ffedd5 50%, #e0e7ff 100%)' }}>
        {/* Extra gradients for testimonials */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-orange-400/10 via-orange-200/10 to-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-blue-400/10 via-white/10 to-orange-400/10 rounded-full blur-2xl z-0" />
        <div className="absolute inset-0 opacity-5 bg-[url('/testimonials-bg-pattern.jpg')] bg-cover bg-center"></div>
        <h2 className="text-4xl font-bold mb-12 text-center uppercase relative z-10">Testimonials</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Testimonial 1 */}
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
                  <Image
                    src="/veteran1.jpg"
                    alt="Veteran Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-heading">Veteran Voices</h2>
                  <p className="text-orange-500 font-medium">U.S. Army Veteran</p>
                </div>
              </div>
              <blockquote className="italic text-foreground relative pl-8">
                <FaQuoteLeft className="absolute left-0 top-0 text-orange-500 opacity-50" />
                <p className="text-lg leading-relaxed">"WANAC helped me rediscover my strength and purpose after leaving the military."</p>
                <footer className="mt-4 font-semibold text-right">— Clarence </footer>
              </blockquote>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
                  <Image
                    src="/veteran2.jpg"
                    alt="Veteran Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-heading">Veteran Voices</h2>
                  <p className="text-orange-500 font-medium">U.S. Marine Corps Veteran</p>
                </div>
              </div>
              <blockquote className="italic text-foreground relative pl-8">
                <FaQuoteLeft className="absolute left-0 top-0 text-orange-500 opacity-50" />
                <p className="text-lg leading-relaxed">"WANAC helped me rediscover my strength and purpose after leaving the military."</p>
                <footer className="mt-4 font-semibold text-right">— Sarah M.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section id="community" className="relative bg-[#002147] text-white text-center py-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/community1.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002147]/50 to-[#002147]"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
            Join Our Community
          </h2>
          <p className="mb-8 text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover upcoming events, connect with fellow veterans, and make an impact.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link 
              href="/signup" 
              className="group relative px-8 py-4 bg-orange-500 rounded-lg overflow-hidden shadow-xl hover:shadow-orange-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform transition-transform group-hover:scale-105 duration-300 ease-out"></div>
              <span className="relative flex items-center justify-center gap-2 text-lg font-semibold">
                Sign Up
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/donate" 
              className="group relative px-8 py-4 bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-white/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform transition-transform group-hover:scale-105 duration-300 ease-out"></div>
              <span className="relative flex items-center justify-center gap-2 text-lg font-semibold text-[#002147] group-hover:text-orange-500 transition-colors">
                Donate
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>


          {/* Stats or Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="group bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">5000+</h3>
              <p className="text-gray-300">Active Community Members</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">200+</h3>
              <p className="text-gray-300">Monthly Events</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">50+</h3>
              <p className="text-gray-300">Local Chapters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
<section className="py-20 px-6 text-center bg-black relative overflow-hidden">
  {/* Extra gradients for final section */}
  <div className="absolute -top-24 left-1/2 w-[36rem] h-[36rem] bg-gradient-to-br from-orange-400/20 via-blue-400/10 to-white/10 rounded-full blur-3xl -translate-x-1/2 z-0 animate-pulse" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 via-white/10 to-orange-400/10 rounded-full blur-2xl z-0" />
  <h2 className="text-3xl font-bold mb-12 uppercase text-white text-heading relative">
    Manage Your Experience
    <span className="block h-1 w-20 bg-blue-400 mx-auto mt-4"></span>
  </h2>
  
  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {/* Card 1 */}
    <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 hover:bg-orange-500/20 hover:scale-105 cursor-pointer border border-white/10 hover:border-orange-500/50">
      <div className="flex flex-col items-center text-white">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur group-hover:bg-orange-500/50 transition-all duration-500"></div>
          <lord-icon
            src="https://cdn.lordicon.com/dqxvvqzi.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '64px', height: '64px' }}
            class="relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">Coaching Preferences</h3>
        <p className="text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
          Customize your coaching experience and set your learning goals
        </p>
        <div className="mt-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-orange-400 flex items-center gap-2">
            Learn More 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 hover:bg-orange-500/20 hover:scale-105 cursor-pointer border border-white/10 hover:border-orange-500/50">
      <div className="flex flex-col items-center text-white">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur group-hover:bg-orange-500/50 transition-all duration-500"></div>
          <lord-icon
            src="https://cdn.lordicon.com/kbtmbyzy.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '64px', height: '64px' }}
            class="relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">Subscriptions & Sessions</h3>
        <p className="text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
          Track and manage your subscriptions and upcoming sessions
        </p>
        <div className="mt-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-orange-400 flex items-center gap-2">
            Learn More 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 transition-all duration-500 hover:bg-orange-500/20 hover:scale-105 cursor-pointer border border-white/10 hover:border-orange-500/50">
      <div className="flex flex-col items-center text-white">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-orange-500/30 rounded-full blur group-hover:bg-orange-500/50 transition-all duration-500"></div>
          <lord-icon
            src="https://cdn.lordicon.com/psnhyobz.json"
            trigger="hover"
            colors="primary:#ee8220,secondary:#ffffff"
            style={{ width: '64px', height: '64px' }}
            class="relative z-10"
          />
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors duration-300">Notification Settings</h3>
        <p className="text-gray-300 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
          Set up your preferred notification preferences
        </p>
        <div className="mt-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-orange-400 flex items-center gap-2">
            Learn More 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
<section>
  
</section>

    </div>
  );
}
