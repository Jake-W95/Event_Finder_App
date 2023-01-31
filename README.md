# EventFinder
#### Live Application:

### An application that allows users to search for, get information about and save *events* to a list

Users can currently search either by *city* or *keyword* to find events

![image](https://user-images.githubusercontent.com/115796768/211937646-d7b9907a-969b-4a46-919b-19072e30eea7.png)

Events are displayed on BootStrap cards, showing information gathered from the Ticketmaster API.

More information can be seen by clicking on the __more details__ button, which shows a modal with the events location (from google maps API), date, time, countdown and useful links:

![image](https://user-images.githubusercontent.com/115796768/211938032-f7beb775-4c7f-48f6-afd5-1f32f544864a.png)

Events can be saved to local storage using the __save__ button, and will show on the homepage in the _Saved Events_ section:

![image](https://user-images.githubusercontent.com/115796768/211938314-e9aaa0b3-7666-4e1b-9b62-6beafee010d2.png)

When on the homepage, the _save_ button is replaced with a _delete_ button, which removes the event from the homepage as well as local storage.

Currently users can filter results by city, or by date:

![image](https://user-images.githubusercontent.com/115796768/211938477-a8c82bfc-177a-440c-a794-35501ea6933b.png)

In the future more search parameters will be added, such as: Genre, price, family friendly and more.
