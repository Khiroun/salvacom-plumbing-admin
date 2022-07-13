import { doc, onSnapshot } from "firebase/firestore";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { db, updateDocument } from "../../../firebase";
import ImageSection from "./ImageSection";
import ServiceInfo from "./ServiceInfo";
import { uploadFile } from "../../../firebase/storage";
type Props = {
  serviceId: string;
};
const Content: FC<Props> = ({ serviceId }) => {
  const [service, setService] = useState<any>({});
  useEffect(() => {
    const docRef = doc(db, "services", serviceId);
    const unseb = onSnapshot(docRef, (res) => {
      setService({
        id: res.id,
        ...res.data(),
      });
    });
    return unseb;
  }, []);
  const updateImage = async (newImage: File) => {
    const newImageURL = await uploadFile(`service${serviceId}`, newImage);
    await updateDocument("services", serviceId, {
      imageUrl: newImageURL,
    });
  };
  return (
    <Paper
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
      }}
    >
      <ImageSection imageURL={service.imageUrl} updateImage={updateImage} />
      <ServiceInfo
        serviceName={service.name}
        serviceDescription={service.description}
      />
    </Paper>
  );
};

export default Content;
