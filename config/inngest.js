import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/models/User";


export const inngest = new Inngest({ id: "daniyal-next" });

export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-daniyal'
    },
    {event: 'clerk/user.created'},
    async({event})=>{
        const{id,first_name,last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        await dbConnect();
        await User.create(userData)
    }
)

export const syncUserUpdate = inngest.createFunction(
    {
    id: 'update-user-daniyal',
},
{event: 'clerk/user.updated'},
async({event})=>{
    const{id,first_name,last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: `${first_name} ${last_name}`,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        }
        await dbConnect()
        await User.findByIdAndUpdate(id, userData)
}
)

export const syncUserDelete = inngest.createFunction(
    {
        id: 'delete-user-daniyal',
    },
    {event: 'clerk/user.deleted'},
    async({event})=>{
        const {id} = event.data;
        await dbConnect()
        await User.findByIdAndDelete(id)
    }
) 