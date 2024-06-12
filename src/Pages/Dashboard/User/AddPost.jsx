import { useEffect, useState } from "react";
import useAllPosts from "../../../hooks/useAllPosts";
import useAllTags from "../../../hooks/useAllTags";
import useUser from "../../../hooks/useUser";
import { set } from "firebase/database";


const AddPost = () => {
    const [user] = useUser()
    const [posts] = useAllPosts(); 
    const [tags] = useAllTags();
    const [tagNames,setTagNames] = useState([])

    useEffect(() => {
        setTagNames(tags.map(tag => tag.name))
    },[tags])
    console.log(tagNames)

    /*This page will have a form with the following fields:
        -Post Title
	    -Post Description
        -Tag (Select a tag from the dropdown. Use the React-select npm package. Implementing this package is optional.)


    A normal user can add up to 5 posts(user.mebership === false means normal user). If he/she exceeds the post count(use user.email to see how many post he has in post(post.owner)), the Add Post Page will only show the Become a Member button that will redirect the user to the Membership Page hide the form and show relavet message. 
    
    If a user adds a post, the post will be added to the posts collection in the database with the following fields:
    - title
    - description
    - tag
    - owner (email of the user who added the post ,use user.email)
    - dateAdded (current date)
    - upVote (default 0)
    - downVote (default 0)
    - visibility (default true)
*/
    return (
        <div>
            
        </div>
    );
};

export default AddPost;