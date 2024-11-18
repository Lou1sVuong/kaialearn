import { ethers } from "ethers";
import KaiaLearnNFT_ABI from "@/lib/abi/KaiaLearnNFT.json";
import { toast } from "@/hooks/use-toast";

export async function mintNFT({
  title,
  description,
  score,
}: {
  title: string;
  description: string;
  score: number;
}) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Lấy hợp đồng KaiaLearnNFT đã triển khai
  const contractAddress = "0x28e05cbe573f037b7d7cd98b14ff03d34a343b72";
  const contract = new ethers.Contract(
    contractAddress,
    KaiaLearnNFT_ABI,
    signer,
  );

  // Gọi hàm mintCertificate và truyền metadata base64
  const tx = await contract.mintCertificate(title, description, score);
  await tx.wait();
  toast({
    title: "Minted Certificate Successfully",
    description: "You can now view your certificate in your wallet",
  });
}
