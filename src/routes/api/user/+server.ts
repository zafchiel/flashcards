import { deleteUser } from "$lib/server/actions/deleteAccount";
import { DatabaseError } from "@neondatabase/serverless";
import { error, json, type RequestHandler } from "@sveltejs/kit";

// DELETE request handler for deleting a user
export const DELETE: RequestHandler = async ({ locals }) => {
    // Validate the session
    const session = await locals.auth.validate();
    // If the session is not valid, return a 401 Unauthorized error
    if (!session) throw error(401, { message: "Unauthorized" });

    try {
        // Attempt to delete the user
        const res = await deleteUser(session.user.userId);
        // If the deletion was successful, return a 200 OK response
        if(res.success) return json({success: true}, {status: 200});

        // If the deletion was not successful, return a 500 Internal Server Error
        throw error(500, {message: "Failed to delete user"});
    } catch (error) {
        // If the error is a DatabaseError, return a 500 Internal Server Error with the error message
        if (error instanceof DatabaseError) {
            return json({ error: error.message }, { status: 500 });
        }
        // For all other types of errors, return a 500 Internal Server Error with a generic error message
        return json({ error: "An unexpected error occurred" }, { status: 500 });
    }
};