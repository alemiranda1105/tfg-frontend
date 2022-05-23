import { FaDatabase, FaQuestionCircle } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdMail, MdHomeFilled, MdDataExploration, MdCloudUpload, MdLogin } from "react-icons/md";

export const getIconFromName = (iconName: string) => {
    const size = 17;
    switch(iconName) {
        case 'IDSEM' || 'Home':
            return <MdHomeFilled size={size} className="m-1"/>
        case 'Dataset':
            return <FaDatabase size={size} className="m-1"/>
        case 'Results':
            return <MdDataExploration size={size} className="m-1"/>
        case 'FAQ':
            return <FaQuestionCircle size={size} className="m-1"/>
        case 'Upload method':
            return <MdCloudUpload size={size} className="m-1"/>
        case 'Contact':
            return <MdMail size={size} className="m-1"/>
        case 'Login':
            return <MdLogin size={size} className="m-1"/>
        case 'Sign up':
            return <FiUserPlus size={size} className="m-1"/>
    }
}