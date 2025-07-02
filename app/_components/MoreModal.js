import {
  HelpCircle,
  Shield,
  Mail,
  Users,
  PiggyBankIcon,
  HandshakeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/_ui/dialog";
import Link from "next/link";

const MoreModal = ({ isOpen, onClose }) => {
  const moreItems = [
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Frequently Asked Questions",
      link: "/faq",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Users,
      title: "GDS Corner",
      description: "Resources for Gramin Dak Sevaks",
      link: "/gds-corner",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: PiggyBankIcon,
      title: "My Investments",
      description: "check you post office investments",
      link: "/my-investments",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Shield,
      title: "Privacy Policy",
      description: "How we protect your data",
      link: "/privacy-policy",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Mail,
      title: "Contact Us",
      description: "Get in touch with us",
      link: "/contact-us",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: HandshakeIcon,
      title: "About Us",
      description: "Know us better",
      link: "/about-us",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-gray-800">
            <span>More Options</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {moreItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={onClose}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}
              >
                <item.icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <span className="font-medium text-blue-600">
              Educational Website:
            </span>{" "}
            This is a promotional and educational website providing information
            about Post Office services. Not an official Government of India
            website.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoreModal;
