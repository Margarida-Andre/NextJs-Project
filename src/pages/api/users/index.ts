import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
  const { method } = req;

    switch (method){
      case 'GET':
        //acesso ao mongoDb e obter os users

        const {db} = await connectToDatabase();
        const data = await db.collection('user').find().toArray();
        res.status(200).json(data);
    
    
        // res.status(200).json([
       //   {id: 1, name: 'Denise André', method },
       //    {id: 2, name: 'Abel Sebastião', method },
       //      {id: 3, name: 'Josimar Sebastião', method },
          
       // ]);
        break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler;
