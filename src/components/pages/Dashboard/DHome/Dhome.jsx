import Admin from "../Admin/Admin";
import Agent from "../Agent/Agent";
import Users from "../User/Users";

const Dhome = () => {
    let userRole = 'User'
    return (
        <div>
            <section>
                {
                    userRole === 'Admin' ? <> <Admin /> </> : '' || userRole === 'Agent' ? <> <Agent /> </> : '' || userRole === 'User' ? <> <Users /> </> : ''
                }
            </section>
        </div>
    );
};

export default Dhome;