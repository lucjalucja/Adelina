import { useRouter } from "next/router";
import Image from "next/image";

const projects = [
    {
        id: "1",
        title: "Mieszkanie 42 m²",
        description: "Detailed description of Mieszkanie 42 m².",
        gallery: ["/project1.png", "/project1-2.png", "/project1-3.png"],
    },
    {
        id: "2",
        title: "Salon 45m²",
        description: "Detailed description of Salon 45m².",
        gallery: ["/project2.png", "/project2-2.png", "/project2-3.png"],
    },
    {
        id: "3",
        title: "Łazienka 5m²",
        description: "Detailed description of Łazienka 5m².",
        gallery: ["/project3.png", "/project3-2.png"],
    },
    {
        id: "4",
        title: "Sypialnia 18 m²",
        description: "Detailed description of Sypialnia 18 m².",
        gallery: ["/project4.png", "/project4-2.png"],
    },
];

const ProjectDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const project = projects.find((p) => p.id === id);

    if (!project) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <p className="text-gray-700 mb-6">{project.description}</p>
            <div className="grid grid-cols-1 gap-4">
                {project.gallery.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`${project.title} image ${index + 1}`}
                        width={500}
                        height={300}
                        objectFit="cover"
                        className="rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectDetail;
