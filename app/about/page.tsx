import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral pt-32">
      {/* Hero Section */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-primary mb-6">
            About Us
          </h1>
          <div className="h-1 w-20 bg-accent mb-8"></div>
          <p className="text-xl text-primary/80 max-w-2xl">
            We are a team of passionate developers and designers creating exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
            <p className="text-primary/70 leading-relaxed">
              We strive to create innovative digital solutions that make a real difference. 
              Our approach combines cutting-edge technology with thoughtful design to deliver 
              exceptional results for our clients.
            </p>
            <p className="text-primary/70 leading-relaxed">
              With years of experience in web development and design, we understand what it 
              takes to create successful digital products that users love.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            {/* Placeholder for image - you can add your own image later */}
            <div className="absolute inset-0 flex items-center justify-center text-primary/20">
              <span className="text-sm">Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-20 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-primary mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We embrace new technologies and creative solutions to solve complex problems."
              },
              {
                title: "Quality",
                description: "We maintain the highest standards in everything we create and deliver."
              },
              {
                title: "Collaboration",
                description: "We believe in working closely with our clients to achieve the best results."
              }
            ].map((value, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                <p className="text-primary/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-primary mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 mb-4">
                  {/* Placeholder for team member photos - add your own images later */}
                  <div className="w-full h-full flex items-center justify-center text-primary/20">
                    <span className="text-sm">Photo</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">Team Member {member}</h3>
                <p className="text-sm text-primary/70">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 