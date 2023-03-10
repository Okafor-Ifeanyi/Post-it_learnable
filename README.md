Post-it by `Prog Bio`

#### Start up
   - 1st commit Hosted with my initial installed dependencies 

## Model Diagram

    https://dbdiagram.io/d/640748ba296d97641d861a12

## Design Pattern
    For my post-it i used `layered structure` cause it gave me the feeling of
    if i could get one right right, then the rest would be `cake`
    Lets see how it works.
    
## **Soft Delete** 
This feature was implemented by adding an extra attribute to the Postit model called `deleted`
**Posts**
```json
{
    "post": "Soft delete feature",
    "ownerID": "640a12d5f6020fee349f8219",
    "deleted": false    // default: false
}
```
the delete `http request` in the controller is set to `PATCH` => updates deleted attribute in the post to true. 
**Posts**
```json
{
    "post": "Soft delete feature",
    "ownerID": "640a12d5f6020fee349f8219",
    "deleted": true
}
```
All get `Post` request in the db have been set to get request by `id` and `delete == false`. To prevent a user from calling a 
deleted request 
-     _await PostService.findOne({deleted: false})_
-     _await PostService.findbyID({ post: info.post, deleted: false })_

Deleted posts are treated as unexisting to the users on Postit but all initial data on the system are still intact.
   
**Detected Loophole**

1.     Deleted posts can still not be duplicated
2.     Recreation of a deleted post will throw an error because posts are unique
3.     Removal of post uniqueness to accomodate the last stated loophole will cause major redundancy with reason of eg that a client could click their create post button 5* due to a lagging device, slow intrnet... and have the same post created 5*, which would only cause such a client more pain






