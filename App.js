import React from "react";
import Entry from "./screens/Entry";
import * as Notifications from "expo-notifications";
import { ToastConfig } from "./components/Toastcomponent";

//Local Notification
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  // const [menu, setMenu] = useState([
  //   {
  //     id: "1",
  //     title: "Pizza",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "4",
  //     title: "Chawarma",
  //     img0: logoDefault,
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  // ]);

  // const menus = [
  //   {
  //     id: "1",
  //     title: "Pizza",
  //     img0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     title: "Chawarma",
  //     img0: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //     format: [
  //       {
  //         nom: "Petit",
  //         price: 1000,
  //         details: "Petit, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Moyen",
  //         price: 2000,
  //         details: "Moyen, Sauce, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //       {
  //         nom: "Lage",
  //         price: 3000,
  //         details: "Lage, Pain, Sel, Oignon",
  //         img1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU",
  //         img2: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
  //         img3: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg",
  //       },
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   async function saveData() {
  //     try {
  //       await setCollectionData("menus", "6CGuUMuLrcvXoNDh5Rmw", { menus });
  //       console.log("save ok");
  //     } catch (error) {
  //       console.log("errorSaveMenus:::", error);
  //     }
  //   }
  //   saveData();

  //   return () => saveData();
  // }, []);

  return (
    <>
      <Entry />
      <ToastConfig />
    </>
  );
}
