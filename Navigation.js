import React from 'react';
import{createAppContainer} from 'react-navigation';
import{createStackNavigator} from 'react-navigation-stack';
import Home from './Components/Home';
import Favourites from './Components/Favourites';
import Map from './Components/Map';
import Movie from './Components/Movie';

  const AppNavigator = createStackNavigator({
    Home:{screen: Home},
    Map:{screen: Map},
    Favourites: {screen: Favourites},
    Movie: {screen: Movie},

  });



  const AppContainer =  createAppContainer(AppNavigator);

  export default function Navigation() {
    return(
    <AppContainer/>
    );
  }