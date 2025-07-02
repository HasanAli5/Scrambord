import { PlusIcon } from '@heroicons/react/24/solid';
import { HandRaisedIcon } from '@heroicons/react/24/outline';

class TileStatics {
  static GetColour(t) {
    let type = String(t);
    if (type.includes("h")) {
      return "red";
    }
    else if (type.includes("p")) {
      return "green";
    }
    else if (type.includes("s")) {
      return "orange";
    }
    else if (type == "rd") {
      return "purple";
    }
    else if (type == "rbe") {
      return "blue";
    }
    else {
      return "default";
    }
  }
  static GetText(t) {
    let type = String(t)
    switch (type) {
      case "1h":
        return "-1";
      case "2h":
        return "-2";
      case "3h":
        return "-3";
      case "1p":
        return "+1";
      case "2p":
        return "+2";
      case "3p":
        return "+3";
      case "2s":
        return "2x";
      case "3s":
        return "3x";
      case "rd":
        return <HandRaisedIcon className="h-full sm:p-1 md:p-2 stroke-1"/>;
      case "rbe":
        return <PlusIcon className="h-full sm:p-1 md:p-2 stroke-1"/>;
      default:
        return "";
    }
  }
}


export default TileStatics