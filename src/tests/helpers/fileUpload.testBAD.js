import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.v2.config({
    cloud_name: 'ddtyuinf5',
    api_key: '187671926593546',
    api_secret: 'sc_AutVbeK5W6PTX1IPkseihSCA',
    secure: true
});

describe('pruebas en fileUpload', () => {
    test('debe cargar un archivo y retornar la URL', async (done) => {
        const resp = await fetch('https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772242__340.jpg');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file);

        const segments = url.split('/');
        const imgId = segments[segments.length - 1].replace('.jpg', '');
        console.log(imgId);

        cloudinary.v2.api.delete_resources(imgId, {}, () => {
            done();
        });
        
        // console.log(url);
        expect(typeof(url)).toBe('string');
    });

    test('debe de retornar un error', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});