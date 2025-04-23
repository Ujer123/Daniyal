
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt, FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaLocationDot, FaUserLock } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";

const ContactInfo = () => (
    <div className="bg-[#011c2b] rounded-lg p-6 h-full">
        <h2 className="text-xl text-white">Contact Information</h2>
        <p className="text-sm text-gray-300 mt-4">
            If you have any questions, simply use the following contact details. For Manufacturing and Export-related inquiries:
        </p>
        <ul className="mt-16 space-y-8">
            <ContactDetail icon={<CiMail />} text="rccreation.team@yahoo.com" />
            <ContactDetail icon={<FaPhoneAlt />} text="+91 9266-116358, +91 11-4227-3742" />
            <ContactDetail icon={<FaLocationDot />} text="Dongri-400003, Mumbai, INDIA" />
        </ul>
        <SocialLinks />
    </div>
);

const ContactDetail = ({ icon, text }) => (
    <li className="flex items-center">
        <span className="text-xl text-white">{icon}</span>
        <p className="text-sm text-gray-300 ml-4">{text}</p>
    </li>
);

const SocialLinks = () => (
    <ul className="flex gap-4 mt-16">
        <SocialIcon icon={<FaFacebook />} />
        <SocialIcon icon={<FaLinkedinIn />} />
        <SocialIcon icon={<FaInstagram />} />
    </ul>
);

const SocialIcon = ({ icon }) => (
    <li className="bg-gray-800 hover:bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center">
        <span className="text-white text-2xl cursor-pointer">{icon}</span>
    </li>
);

const ContactForm = () => (
    <div className="p-4 lg:col-span-2">
        <form>
            <div className="grid sm:grid-cols-2 gap-8">
                <InputField placeholder="First Name" icon={<FaUserLock />} />
                <InputField placeholder="Last Name" icon={<FaUserLock />} />
                <InputField placeholder="Phone No." type="number" icon={<FaPhoneAlt />} />
                <InputField placeholder="Email" type="email" icon={<CiMail />} />
                <TextArea placeholder="Write Message" icon={<CiMail />} />
            </div>
            <SubjectSelection />
            <button type="button" className="mt-12 flex items-center justify-center text-sm rounded-lg px-4 py-3 tracking-wide text-white bg-orange-500 hover:bg-orange-700">
                <LuSend className='mr-2' /> Send Message
            </button>
        </form>
    </div>
);

const InputField = ({ placeholder, type = "text", icon }) => (
    <div className="relative flex items-center">
        <input type={type} placeholder={placeholder} className="px-2 py-3 w-full text-sm border-b border-gray-300 focus:border-orange-500 outline-none" />
        <span className="absolute right-3 text-gray-500">{icon}</span>
    </div>
);

const TextArea = ({ placeholder, icon }) => (
    <div className="relative flex items-center sm:col-span-2">
        <textarea placeholder={placeholder} className="px-2 pt-3 w-full text-sm border-b border-gray-300 focus:border-orange-500 outline-none" />
        <span className="absolute right-3 text-gray-500">{icon}</span>
    </div>
);

const SubjectSelection = () => (
    <div className="col-span-full">
        <h6 className="text-sm text-gray-800">Select Subject</h6>
        <div className="flex gap-6 mt-4">
            {[
                { id: "radio1", label: "General Inquiry", defaultChecked: true },
                { id: "radio2", label: "Technical Support" },
                { id: "radio3", label: "Website Feedback" }
            ].map(({ id, label, defaultChecked }) => (
                <RadioOption key={id} id={id} label={label} defaultChecked={defaultChecked} />
            ))}
        </div>
    </div>
);

const RadioOption = ({ id, label, defaultChecked = false }) => (
    <div className="flex items-center">
        <input id={id} type="radio" name="subject" className="hidden peer" defaultChecked={defaultChecked} />
        <label htmlFor={id} className="relative p-0.5 flex items-center justify-center border-2 border-[#011c2b] rounded-full w-5 h-5 cursor-pointer">
            <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full" />
        </label>
        <p className="text-sm text-gray-500 ml-4">{label}</p>
    </div>
);

const ContactUs = () => {
    return (
        <>
            <div className="w-full h-fit">
                {/* <Image width={1920} height={100} src={ContactBanner} alt="Contact Banner" className="w-full h-[25em]" /> */}
            </div>

            <div className="max-w-5xl mx-auto bg-white my-10 font-[sans-serif]">
                <div className="text-center px-6">
                <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Get in Touch</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>
                    <p className="text-sm text-gray-500 mt-4">Please don&apos;t hesitate to contact us with any inquiries or messages</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-4 p-2 shadow-lg rounded-lg mt-12">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </>
    );
};

export default ContactUs;
