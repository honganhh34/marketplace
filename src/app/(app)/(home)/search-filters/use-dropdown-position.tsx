import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> |RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if(!ref.current) return { top:0, left:0 };
        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; //width dropdown

        let left = rect.left +window.scrollX;
        const top = rect.bottom + window.scrollY;

        //check if dropdown would  go off  the right edge of the viewport

        if(left+ dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX - dropdownWidth;

            //if still of-screen, align to the right edge of viewport some padding

            if (left < 0){
                left = window.innerWidth - dropdownWidth -16;
            }
        }

        //ensure dropdown doesn't go off the left edge

        if (left <0){
            left = 16;
        }

        return{getDropdownPosition};

    };

    return { getDropdownPosition };

}; 