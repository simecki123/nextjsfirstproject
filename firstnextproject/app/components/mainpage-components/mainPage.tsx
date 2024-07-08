import React from 'react'
import ToolbarComponent from '../headerComponent'
import UserDeatilsComponent from './user_details_components/userDeatilsComponent'
import ListOfProjectsComponent from './listOfProjectDetailsComponents/lisitOfProjectsComponent'

export default function MainPageCOmponent () {
  return (
    <div className=''>
        <div className=''>
            <ToolbarComponent />
        </div>

        <div className='' >
            <div className=''>
                <UserDeatilsComponent/>
            </div>

            <div className=''>
                <ListOfProjectsComponent />
            </div>
        </div>
    </div>
  )
}
