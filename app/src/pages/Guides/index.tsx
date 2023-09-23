import { Screen, Window } from "../../components/ui/ViewPort";
import BottomTabs from "../../components/ui/BottomTabs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IonContent } from "@ionic/react";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import GuideDialog from "./guideDialog";

const Guides = () => {
  const [guideDialog, setGuideDialog] = useState({
    open: false,
    data: null as any,
  });

  const { data: allGuides, isLoading: isGuidesLoading } = useQuery(
    ["all-guides"],
    async () => {
      const guideRef = collection(db, "guides");
      const q = query(guideRef);
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot?.docs.map((d) => d.data()));
      return [{ todo: [""], emotion: "" }];
    }
  );
  return (
    <Screen>
      <Window padding={5}>
        <Typography variant="h6">Guided Activity</Typography>
        <IonContent>
          {isGuidesLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            allGuides &&
            allGuides?.map((guide) => (
              <Card
                sx={{ width: "100%" }}
                onClick={() => setGuideDialog({ open: true, data: guide })}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Guided Activity
                  </Typography>
                  <Typography variant="h5" component="div">
                    {guide?.emotion}
                  </Typography>
                  <Typography variant="body2">
                    {guide?.todo?.length} Slides
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </IonContent>
        <GuideDialog
          data={guideDialog.data}
          open={guideDialog.open}
          onClose={() => setGuideDialog({ open: false, data: null })}
        />
        <BottomTabs tab="guides" />
      </Window>
    </Screen>
  );
};

export default Guides;
