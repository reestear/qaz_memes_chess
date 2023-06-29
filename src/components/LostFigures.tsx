import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

export const LostFigures = ({title, figures}: LostFiguresProps) => {
    return (
        <div className="flex flex-col text-center font-bold gap-4">
            <h3 className="text-2xl"> {title} </h3>
            <div className="grid grid-cols-5 gap-6">
                {
                    figures.map(figure => {
                        return (
                            <div key={figure.id} className="flex flex-col items-center justify-center">
                                {   
                                    figure.logo 
                                        &&
                                    <img src={figure.logo} alt={figure.name} className="h-10 w-10"/>
                                }
                                <h6 className="text-center text-md">{figure.name}</h6> 
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )
}