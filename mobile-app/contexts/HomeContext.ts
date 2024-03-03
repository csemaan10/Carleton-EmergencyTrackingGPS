import { createContext } from "react";

interface HomeContextProps {
  deleteMode: boolean;
  setDeleteMode: (state: boolean) => void;
  selectedItems: string[];
  setSelectedItems: (state: any) => void;
}

const HomeContext = createContext<HomeContextProps>({} as HomeContextProps);

export default HomeContext;
