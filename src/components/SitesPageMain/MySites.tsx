import { Box } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ReactBingmaps } from "react-bingmaps";
import { db, deleteDocument } from "../../firebase";

const MySites = () => {
  const [pushPins, setPushPins] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const onPushPinClicked = async (id: string) => {
    console.log(id);
    setDeleting(true);
    const userResponse = confirm("Voulez vous vraiment supprimer ce site?");
    if (userResponse) await deleteDocument("sites", id);
    setDeleting(false);
  };
  useEffect(() => {
    const ref = collection(db, "sites");
    const unsub = onSnapshot(ref, (snap) => {
      const res = [];
      snap.forEach((elem) => {
        const data = elem.data();
        console.log(data);
        res.push({
          location: [data.latitude, data.longitude],
          option: { color: "green" },
          addHandler: {
            type: "click",
            callback: () => {
              onPushPinClicked(elem.id);
            },
          },
        });
        setPushPins(res);
      });
    });
    return unsub;
  }, []);
  return (
    <Box maxWidth="100%" height="70vh">
      {pushPins.length === 0 && (
        <ReactBingmaps
          bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
          center={[36.716, 3.003]}
        ></ReactBingmaps>
      )}
      {!deleting && pushPins.length > 0 && (
        <ReactBingmaps
          bingmapKey="Anx4mwLDKI3uWURZVzqDwyAy5SMpfR6Co1jd-NC2XkbkOHSgfZyiJrKvQlIEAcmN"
          center={[36.716, 3.003]}
          pushPins={pushPins}
        ></ReactBingmaps>
      )}
    </Box>
  );
};

export default MySites;
