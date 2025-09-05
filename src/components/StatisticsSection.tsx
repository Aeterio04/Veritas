import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Users, Award, AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const StatisticsSection = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('statistics');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const stats = [
    {
      icon: CheckCircle2,
      number: "50,247",
      label: "Certificates Verified",
      description: "Successfully authenticated documents",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Shield,
      number: "99.9%",
      label: "Accuracy Rate",
      description: "Fraud detection precision",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Users,
      number: "150+",
      label: "Institutions Connected",
      description: "Universities and colleges",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: AlertCircle,
      number: "2,847",
      label: "Fraudulent Documents",
      description: "Detected and flagged",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: TrendingUp,
      number: "45%",
      label: "Fraud Reduction",
      description: "Since platform launch",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Award,
      number: "24/7",
      label: "System Uptime",
      description: "Reliable verification service",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    }
  ];

  const AnimatedNumber = ({ number, isAnimated }: { number: string, isAnimated: boolean }) => {
    const [displayNumber, setDisplayNumber] = useState("0");

    useEffect(() => {
      if (isAnimated) {
        const numericPart = number.replace(/[^\d]/g, '');
        const suffix = number.replace(numericPart, '');
        const target = parseInt(numericPart);
        
        if (target > 0) {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setDisplayNumber(number);
              clearInterval(timer);
            } else {
              setDisplayNumber(Math.floor(current).toLocaleString() + suffix);
            }
          }, 30);
        } else {
          setDisplayNumber(number);
        }
      }
    }, [isAnimated, number]);

    return <span>{displayNumber}</span>;
  };

  return (
    <section id="statistics" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Impact & Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real numbers showcasing our platform's effectiveness in combating certificate fraud 
            and protecting Jharkhand's educational integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="group border-0 shadow-elegant hover:shadow-glow transition-all duration-500">
              <CardContent className="p-8 text-center">
                <div className={`${stat.bgColor} rounded-full p-4 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">
                  <AnimatedNumber number={stat.number} isAnimated={animated} />
                </h3>
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {stat.label}
                </h4>
                <p className="text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="bg-card rounded-2xl p-8 shadow-elegant">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Platform Performance Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary rounded-lg p-6 mb-4">
                <TrendingUp className="h-8 w-8 text-primary-foreground mx-auto" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Processing Speed</h4>
              <p className="text-2xl font-bold text-primary mb-1">&lt; 60s</p>
              <p className="text-sm text-muted-foreground">Average verification time</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-secondary rounded-lg p-6 mb-4">
                <Shield className="h-8 w-8 text-secondary-foreground mx-auto" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Security Level</h4>
              <p className="text-2xl font-bold text-secondary mb-1">256-bit</p>
              <p className="text-sm text-muted-foreground">Encryption standard</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-6 mb-4">
                <Users className="h-8 w-8 text-white mx-auto" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Daily Verifications</h4>
              <p className="text-2xl font-bold text-orange-500 mb-1">500+</p>
              <p className="text-sm text-muted-foreground">Documents processed</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-lg p-6 mb-4">
                <Award className="h-8 w-8 text-white mx-auto" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Satisfaction Rate</h4>
              <p className="text-2xl font-bold text-teal-500 mb-1">98.5%</p>
              <p className="text-sm text-muted-foreground">User satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;