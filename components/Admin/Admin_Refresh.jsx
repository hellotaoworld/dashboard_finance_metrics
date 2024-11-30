import { Card, CardBody } from "@nextui-org/react"


const AdminRefresh = () => {


    return (
        <div className='grid grid-row-2 gap-5'>
            <div className='grid grid-cols-2 gap-2'>
                <Card><CardBody><div>
                    Company


                </div></CardBody></Card>
                <Card><CardBody><div>
                    Year


                </div></CardBody></Card>
            </div>

            <div className='grid grid-cols-2'>
                <button className='refresh_btn bg-default-200'><b>Refresh Data</b></button>
                <button className='refresh_btn bg-default-200'><b>Update Cloud</b></button>
            </div>
        </div>

    )
}

export default AdminRefresh