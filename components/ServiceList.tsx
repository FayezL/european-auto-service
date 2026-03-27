import { SERVICES } from "@/config/site";
import { Wrench, Disc, Search, Circle, Battery, Settings, Cog, ArrowUpDown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "oil-change": <Wrench className="w-8 h-8" />,
  brakes: <Disc className="w-8 h-8" />,
  diagnostics: <Search className="w-8 h-8" />,
  tires: <Circle className="w-8 h-8" />,
  battery: <Battery className="w-8 h-8" />,
  transmission: <Cog className="w-8 h-8" />,
  suspension: <ArrowUpDown className="w-8 h-8" />,
  general: <Settings className="w-8 h-8" />,
};

export default function ServiceList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="card border border-gray-100 hover:border-bmw-blue hover:shadow-lg transition-all duration-200"
        >
          <div className="text-center">
            <div className="inline-flex p-3 bg-blue-50 rounded-lg text-bmw-blue mb-3">
              {iconMap[service.id]}
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              {service.name}
            </h3>
            <p className="text-gray-600 mt-1 text-sm">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
