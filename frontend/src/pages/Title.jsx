import { useEffect } from "react";

function ChangeTitle({title}){
    useEffect(() => {
        document.title = title;
      }, [title]);

    return null;
}

export default ChangeTitle;